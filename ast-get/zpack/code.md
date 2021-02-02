1. Determine the value of the entry is an array or str
while project create multiple pages.
2. If array. Check the files inside the path directory.
3. Do the independence task. But the fileMap is public.
4. Save all files data while collecting them.

5. In the independence task. wrap all files into a scope.
6. Apply add-ons (sth like sourcemap) if the param configured it.
7. Analysis fileMap. Split code to appropriate vendor and chunks according to the user config.
8. If html exiting. Analysis html to check the AST and find out recursively import/include, and replace the variables to corresponding value.
9. If style exiting. Analysis scss or css to handle them. Split code to appropriate vendor and chunks according to the user config.

10. Start output file. 
11. Output html file. 
    write in script tag with MD5-ed link. 
    write in link tag with MD5-ed link.
12. Output css file.
    Handle All urls and file(img ttf e.g.);
13. Output js file
    
