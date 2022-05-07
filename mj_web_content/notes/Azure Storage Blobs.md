---
title: Azure Storage Blobs
subtitle: Just what it sounds like.
date: "2022-05-06T21:30:32"
draft: false
image: /media/Pasted%20image%2020220423143431-stinger.jpg
tags:
  - cloud
  - web development
summary: "Here's my first post. I just need some content in here so here it goes. This is basic usage of blob storage accounts on Azure. Why use this?Thinking of using one for static site serving or just to host all my public images to be able to share them across multiple platforms. It is also fairly [affordable](<https://www.google.com/search?q=azure pricing>)."
---

Here's my first post. I just need some content in here so here it goes. This is basic usage of blob storage accounts on Azure. 

Why use this?

Thinking of using one for static site serving or just to host all my public images to be able to share them across multiple platforms. It is also fairly [affordable](<https://www.google.com/search?q=azure pricing>).

Here's the basics for getting started.

1. Set up Storage Account
1. Set up a container with public access
1. Upload will be available at https://{storageAccountName}.blob.core.windows.net/{containerName}/path/to/file.txt

![Pasted image 20220423143431](../media/Pasted%20image%2020220423143431.png)  {{% caption text="Hello World! Testing what a decent sized caption would look like. How much information is too much?"  %}}

# Mount Blob Storage as Local Drive

Use [rclone](https://rclone.org/azureblob/), [winfsp](https://github.com/winfsp/winfsp), and [nssm](https://nssm.cc/usage).

Rclone config walks through the configuration. Just need storage account name and key.

winfsp allows rclone to mount as virtual drive.

nssm allows this to be set up as a service and automatically run rclone mount on log in. Be aware of the account that will run the service. A local system account will not have access to the rclone config you set up. 

rclone mount {configName}:{blobName}/ {driveLetter}: --vfs-cache-mode full

![Pasted image 20220423150856](../media/Pasted%20image%2020220423150856.png)  {{% caption text="Here is the GUI for NSSM. It get brought up from the command line when you are setting up the service. Works well."  %}}

# Serving Static Websites

Blob storage be used to host static website. Awesome. [More here.](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website)

You can serve static content (HTML, CSS, JavaScript, and image files) directly from a storage container named *$web*

Note that you need to get Azure CDN involved if you want to serve this from a custom domain over HTTPS.
