using Google.Cloud.Firestore;

namespace AngularApp1.Server.Models
{
    public class FirebaseConnectionsViewModel
    {
        private static FirebaseConnectionsViewModel _instance;
        private FirestoreDb database;

        private FirebaseConnectionsViewModel()
        {
            InitializeFirebase();
        }
        /// <summary>
        /// That method takes care of firebase instance to access.
        /// </summary>
        public static FirebaseConnectionsViewModel Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new FirebaseConnectionsViewModel();
                }
                return _instance;
            }
        }
        /// <summary>
        /// That funcion initializes the Firebase Connection.
        /// </summary>
        private void InitializeFirebase()
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + @"testing-c1791-firebase.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);
            database = FirestoreDb.Create("testing-c1791");
        }
        public FirestoreDb FirestoreDb
        {
            get { return database; }
        }
    }
}
