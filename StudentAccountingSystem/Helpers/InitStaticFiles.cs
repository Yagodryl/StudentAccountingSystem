using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Helpers
{
    public static class InitStaticFiles
    {
        public static string CreateFolderServer(IWebHostEnvironment env,
           IConfiguration configuration, string[] settings)
        {
            string fileDestDir = env.ContentRootPath;
            foreach (var pathConfig in settings)
            {
                fileDestDir = Path.Combine(fileDestDir, configuration.GetValue<string>(pathConfig));
                if (!Directory.Exists(fileDestDir))
                {
                    Directory.CreateDirectory(fileDestDir);
                }
            }
            return fileDestDir;
        }


        public static string CreateImageByFileName(IWebHostEnvironment env,
                                                  IConfiguration configuration,
                                                  string[] settingsFolder,
                                                  string fileName, IFormFile imageFile)
        {
            string[] imageSizes = ((string)configuration.GetValue<string>("ImageSizes")).Split(" ");
            bool fileBeginCreated = false;
            string fileDestDir = env.ContentRootPath;

            try
            {
                foreach (var pathConfig in settingsFolder)
                {
                    fileDestDir = Path.Combine(fileDestDir, configuration.GetValue<string>(pathConfig));
                    if (!Directory.Exists(fileDestDir))
                    {
                        Directory.CreateDirectory(fileDestDir);
                    }
                }

                fileBeginCreated = true;

                using (var bmp = imageFile.fileToImage())
                {
                    foreach (var imagePrefix in imageSizes)
                    {
                        int size = int.Parse(imagePrefix);
                        string fileSave = Path.Combine(fileDestDir, $"{imagePrefix}_{fileName}");
                        if (bmp != null)
                        {
                            using (var image = ImageHelper.CompressImage(bmp, size, size))
                            {
                                if (image == null)
                                    throw new Exception("В процесі створення фото виникли проблеми");

                                image.Save(fileSave, ImageFormat.Jpeg);
                            }
                        }
                        else
                        {
                            throw new Exception("В процесі створення фото виникли проблеми");
                        }
                    }
                }
                return fileDestDir;
            }
            catch
            {
                if (fileBeginCreated)
                {
                    foreach (var imagePrefix in imageSizes)
                    {
                        string fileImage = Path.Combine(fileDestDir, $"{imagePrefix}_{fileName}");
                        if (File.Exists(fileImage))
                        {
                            File.Delete(fileImage);
                        }
                    }
                }
                return null;
            }
        }

    }
}

