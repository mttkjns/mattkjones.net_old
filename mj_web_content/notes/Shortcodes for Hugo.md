---
title: Shortcodes for Hugo
subtitle: Helpful templates
date: "2022-05-07T00:32:33"
draft: false
image: /media/Screenshot%202022-05-07%20003344.jpg
tags:
  - hugo
summary: Some quick shortcodes for reference.
---

Here are a couple shortcodes that are enabled. This is just for reference.

````html
{{\% columns \%}}
{{\% column \%}}
{{\% endcolumns \%}}
````

{{% columns %}}  
Will make some nice columns to work with.  
{{% column %}}  
Here we are on the right hand side.  
{{% endcolumns %}}

How do columns look with an img?

{{% columns %}}  
![left side](../media/202204280730_cherokeeBluffs.jpg)  {{% caption text="How is this going to look?" %}}  
{{% column %}}  
And a bunch of wonderful text on the right side of the page. This may or may not look good. Will have to see how it renders! Would be cool for that publication look, right?  
{{% endcolumns %}}

{{% columns %}}  
And a bunch of wonderful text on the right side of the page. This may or may not look good. Will have to see how it renders! Would be cool for that publication look, right?  
{{% column %}}  
![Right Side](../media/202204280726_cherokeeBluffs.jpg)  {{% caption text="It is probably going to look too bold." %}}  
{{% endcolumns %}}

````html
{{\% figure src="/media/202204280730_cherokeeBluffs.jpg" \%}}

{{\% gallery %}}
	{{\% figure src="/media/202204280730_cherokeeBluffs.jpg" title="Cherokee Bluffs 1" \%}}
	{{\%figure src="/media/202202191038_graysonHIghlands.jpg" title="Grayson Highlands" \%}}
	{{\% figure src="/media/202204280726_cherokeeBluffs.jpg" title="Cherokee Bluffs 2" \%}}
{{\% /gallery >}}
````

And we've got a nice gallery if we want it.

{{% figure src="/media/202204280730_cherokeeBluffs.jpg" title="grass is green" %}}

{{% gallery %}}  
{{% figure src="/media/202204280730_cherokeeBluffs.jpg" title="Cherokee Bluffs 1" %}}  
{{% figure src="/media/202202191038_graysonHIghlands.jpg" title="Grayson Highlands" %}}  
{{% figure src="/media/202204280726_cherokeeBluffs.jpg" title="Cherokee Bluffs 2" %}}  
{{% /gallery %}}
