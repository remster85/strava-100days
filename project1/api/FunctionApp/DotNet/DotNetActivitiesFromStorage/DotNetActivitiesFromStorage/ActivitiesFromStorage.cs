using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.WindowsAzure.Storage.Blob;

using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Threading.Tasks;
using LogLevel = Microsoft.Extensions.Logging.LogLevel;
using System.Reflection;

namespace DotNetActivitiesFromStorage
{
    public static class ActivitiesFromStorage
    {
        [FunctionName("ActivitiesFromStorage")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {

            CloudStorageAccount storageAccount = new CloudStorageAccount(
               new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials(
               "remsstravaactivities", "FLZLc8w/ixYcfulAU8rMGRsYoYk7hK5TG3PHHbypAsPhLpASiEwYqcrTLu80xBihCYRZCNhzxA1tUlppOyOu1g=="), true);

            // Create a blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Get a reference to a container named "mycontainer."
            CloudBlobContainer container = blobClient.GetContainerReference("activities");

            // Get a reference to a blob named "photo1.jpg".
            CloudBlockBlob blockBlob = container.GetBlockBlobReference("remi");

            var activities = await blockBlob.DownloadTextAsync();

            return (ActionResult)new OkObjectResult(activities);

        }
    }
}
