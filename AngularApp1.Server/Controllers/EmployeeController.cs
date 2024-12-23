using AngularApp1.Server.Models;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AngularApp1.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        FirestoreDb firestoreDb = FirebaseConnectionsViewModel.Instance.FirestoreDb;

        [HttpPost]
        public JsonResult Guardar()
        {
            // Leer el cuerpo de la solicitud como texto
            using var reader = new StreamReader(Request.Body);
            var rawJson = reader.ReadToEndAsync().GetAwaiter().GetResult();

            // Deserializar el JSON al objeto Personal
            var oPersona = JsonSerializer.Deserialize<FirebasePersonal>(rawJson);

            bool respuesta = true;
            if (string.IsNullOrEmpty(oPersona.id))
            {
                //create new
                DocumentReference docRef = firestoreDb.Collection("Personal").Document();
                oPersona.id = docRef.Id;
                docRef.SetAsync(oPersona, SetOptions.MergeAll).GetAwaiter().GetResult();
            }
            else
            {
                //update
                DocumentReference docRef = firestoreDb.Collection("Personal").Document(oPersona.id);
                docRef.SetAsync(oPersona, SetOptions.MergeAll).GetAwaiter().GetResult();
            }

            return Json(new { resultado = respuesta });
        }

        [HttpGet]
        public JsonResult Listar()
        {

            Query query = firestoreDb.Collection("Personal");
            QuerySnapshot querySnapshot = query.GetSnapshotAsync().GetAwaiter().GetResult();
            List<FirebasePersonal> employees = querySnapshot.Documents
                .Select(doc => doc.ConvertTo<FirebasePersonal>())
                .ToList();

            return Json(employees);
        }

        [HttpGet("{id}")]
        public JsonResult Obtener(string id)
        {
            DocumentReference docRef = firestoreDb.Collection("Personal").Document(id);
            DocumentSnapshot snapshot = docRef.GetSnapshotAsync().GetAwaiter().GetResult();
            if (snapshot.Exists)
            {
                FirebasePersonal employee = snapshot.ConvertTo<FirebasePersonal>();
                return Json(employee);
            }
            else
            {
                return Json(new { resultado = false });
            }

        }


        [HttpDelete("{id}")]
        public JsonResult Eliminar(string id)
        {
            bool respuesta = true;
            try
            {
                DocumentReference docRef = firestoreDb.Collection("Personal").Document(id);
                DocumentSnapshot snapshot = docRef.GetSnapshotAsync().GetAwaiter().GetResult();
                FirebasePersonal employee = snapshot.ConvertTo<FirebasePersonal>();
                DocumentReference docRefEliminado = firestoreDb.Collection("Personal Eliminado").Document(id);
                docRefEliminado.SetAsync(employee, SetOptions.MergeAll).GetAwaiter().GetResult();
                docRef.DeleteAsync().GetAwaiter().GetResult();
            }
            catch
            {
                respuesta = false;
            }

            return Json(new { resultado = respuesta });
        }

    }
}
