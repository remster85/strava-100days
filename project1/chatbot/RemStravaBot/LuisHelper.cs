// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//
// Generated with Bot Builder V4 SDK Template for Visual Studio CoreBot v4.3.0

using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.AI.Luis;
using Microsoft.Bot.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using RemStravaBot.Models;

namespace RemStravaBot
{
    public static class LuisHelper
    {
        public static async Task<DistanceInfo> ExecuteLuisQuery(IConfiguration configuration, ILogger logger, ITurnContext turnContext, CancellationToken cancellationToken)
        {

            DistanceInfo output = new DistanceInfo();

            try
            {
                // Create the LUIS settings from configuration.
                var luisApplication = new LuisApplication(
                    configuration["LuisAppId"],
                    configuration["LuisAPIKey"],
                    "https://" + configuration["LuisAPIHostName"]
                );

                var recognizer = new LuisRecognizer(luisApplication);

                // The actual call to LUIS
                var recognizerResult = await recognizer.RecognizeAsync(turnContext, cancellationToken);

                var (intent, score) = recognizerResult.GetTopScoringIntent();
                if (intent == "Mileage_Status")
                {

                    // We need to get the result from the LUIS JSON which at every level returns an array.
                    var timex = recognizerResult.Entities["datetime"]?.FirstOrDefault()?["timex"]?.FirstOrDefault()?.ToString().Split('T')[0];
                    var distanceUnit = recognizerResult.Entities["distance_unit"]?.FirstOrDefault()?.ToString();

                    var request = WebRequest.Create("https://getstravamileage20190721115651.azurewebsites.net/api/GetStravaMileage?timex=" + timex);
                    var response = request.GetResponse();

                    // Get the stream containing content returned by the server. 
                    // The using block ensures the stream is automatically closed. 
                    using (Stream dataStream = response.GetResponseStream())
                    {
                        // Open the stream using a StreamReader for easy access.  
                        StreamReader reader = new StreamReader(dataStream);
                        // Read the content.

                        var responseFromServer = reader.ReadToEnd();
                        // Display the content.  
                        Console.WriteLine(responseFromServer);

                        output.Distance = Math.Round(double.Parse((responseFromServer.Trim())) / 1000, 0);
                        if (distanceUnit.ToUpper().Contains("MILE"))
                        {
                            output.Unit = DistanceUnit.MILES;
                            output.Distance /= 1.6;

                        }

                    }
                }
            }
            catch (Exception e)
            {
                logger.LogWarning($"LUIS Exception: {e.Message} Check your LUIS configuration.");
            }

            return output;
        }
    }
}
