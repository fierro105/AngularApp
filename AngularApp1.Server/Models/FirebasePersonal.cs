using Google.Cloud.Firestore;

namespace AngularApp1.Server.Models
{
    [FirestoreData]
    public class FirebasePersonal
    {
        [FirestoreProperty]
        public string id { get; set; }
        [FirestoreProperty]
        public string name { get; set; }
        [FirestoreProperty]
        public string last_name { get; set; }
        [FirestoreProperty]
        public string email { get; set; }
        [FirestoreProperty]
        public string position { get; set; }
        [FirestoreProperty]
        public int age { get; set; }
    }
}
