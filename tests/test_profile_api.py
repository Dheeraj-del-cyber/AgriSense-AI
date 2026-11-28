import os
import tempfile
import unittest
from unittest.mock import patch

from flask import Flask

from server.handlers.profile_handler import initialize_profile_store, profile_bp


class ProfileApiTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.database_path = os.path.join(self.temp_dir.name, "profiles.sqlite3")
        self.environment = patch.dict(
            os.environ, {"AGRISENSE_DATABASE_PATH": self.database_path}
        )
        self.environment.start()
        initialize_profile_store()

        self.app = Flask(__name__)
        self.app.register_blueprint(profile_bp)
        self.client = self.app.test_client()

    def tearDown(self):
        self.environment.stop()
        self.temp_dir.cleanup()

    def register(self):
        response = self.client.post(
            "/api/auth/register",
            json={
                "name": "Test Grower",
                "phone": "9876543210",
                "password": "correct-horse",
            },
        )
        self.assertEqual(response.status_code, 201)
        return response.get_json()

    @staticmethod
    def auth_headers(token):
        return {"Authorization": f"Bearer {token}"}

    def test_registration_login_and_duplicate_account(self):
        registration = self.register()
        self.assertEqual(registration["profile"]["name"], "Test Grower")
        self.assertEqual(registration["profile"]["scanCount"], 0)
        self.assertTrue(registration["token"])

        duplicate = self.client.post(
            "/api/auth/register",
            json={
                "name": "Another Grower",
                "phone": "9876543210",
                "password": "correct-horse",
            },
        )
        self.assertEqual(duplicate.status_code, 409)

        invalid_login = self.client.post(
            "/api/auth/login",
            json={"phone": "9876543210", "password": "wrong-password"},
        )
        self.assertEqual(invalid_login.status_code, 401)

        login = self.client.post(
            "/api/auth/login",
            json={"phone": "9876543210", "password": "correct-horse"},
        )
        self.assertEqual(login.status_code, 200)
        self.assertEqual(login.get_json()["profile"]["phone"], "9876543210")

    def test_profile_update_and_scan_history_persist(self):
        registration = self.register()
        headers = self.auth_headers(registration["token"])
        photo = "data:image/jpeg;base64,dGVzdA=="

        update = self.client.put(
            "/api/profile",
            headers=headers,
            json={"name": "Updated Grower", "photo": photo},
        )
        self.assertEqual(update.status_code, 200)
        self.assertEqual(update.get_json()["profile"]["photo"], photo)

        invalid_update = self.client.put(
            "/api/profile", headers=headers, json={"scanCount": 100}
        )
        self.assertEqual(invalid_update.status_code, 400)

        scan = self.client.post(
            "/api/profile/scans",
            headers=headers,
            json={
                "diagnosis": "Tomato___Early_blight",
                "confidence": 92.5,
                "moisture": 41,
                "guidance": "Remove affected leaves.",
                "guidanceDetails": {"prevention": ["Improve airflow"]},
            },
        )
        self.assertEqual(scan.status_code, 201)
        profile = scan.get_json()["profile"]
        self.assertEqual(profile["scanCount"], 1)
        self.assertEqual(profile["scans"][0]["diagnosis"], "Tomato___Early_blight")

        persisted = self.client.get("/api/profile", headers=headers)
        self.assertEqual(persisted.status_code, 200)
        persisted_profile = persisted.get_json()["profile"]
        self.assertEqual(persisted_profile["name"], "Updated Grower")
        self.assertEqual(persisted_profile["photo"], photo)
        self.assertEqual(persisted_profile["scanCount"], 1)
        self.assertEqual(persisted_profile["scans"][0]["guidanceDetails"],
                         {"prevention": ["Improve airflow"]})

    def test_profile_requires_authentication_and_logout_revokes_session(self):
        unauthenticated = self.client.get("/api/profile")
        self.assertEqual(unauthenticated.status_code, 401)

        registration = self.register()
        headers = self.auth_headers(registration["token"])
        logout = self.client.post("/api/auth/logout", headers=headers)
        self.assertEqual(logout.status_code, 200)

        revoked = self.client.get("/api/profile", headers=headers)
        self.assertEqual(revoked.status_code, 401)


if __name__ == "__main__":
    unittest.main()
