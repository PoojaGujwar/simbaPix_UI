# SimbaPix

A full-stack SimbaPix app where you can create, share, update and delete albums, and also upload images in albums.

Built with React frontend, Express/Node backend, MongoDB database, and Google authentication.

---

## Demo Link

[Live Demo](https://simba-pix-ui.vercel.app)
 
 ---

## Login

Login with Google Auth

---

## Quick Start
```
git clone https://github.com/PoojaGujwar/simbaPix_UI.git
cd <your repo>
npm install
npm start # or `npm run dev`
```

---

## Technologies

- React JS
- Node.js
- Express
- MongoDB
- Cloudinary 
- React Router

---

## Demo Video
[Demo video](https://drive.google.com/file/d/1e0J7E4jZnVcZkykzbk0GsukfyDCat0IR/view?usp=sharing)

## Features
**Home**
  - Display a list of all albums
  - Add a new album via form
  - Update, delete and share albums
  - Logout button
  
**Share Album**
  - Display a list of cards shared by others
  - Double tap on a card to show images

**Image**
  - Display a list of images
  - Delete images
  - Upload images

 **Login**
   - Login via Google Auth

---

## API Reference

### **GET /albums** <br>
List all albums<br>

Sample Response: <br>
```
[{_id, name, description, ownerId, sharedUser},...]
```
### **GET /images**<br>
List all images<br>
Sample Response: <br>
```
[{_id,imageId, albumId, imageUrl, name, tags, person, isFavorite, comments, size, uploadedAt}]
```

### **GET /v1/users**<br>
List all users<br>
Sample Response: <br>
```
[{_id, userId, name, email}]
```

### **GET /v1/shareData**<br>
List all albums <br>
Sample Response: <br>
```
[{sender, receiver, album}]
```
### **POST /albums** <br>
Create a new album<br>

Sample Response: <br>
```
{ name, description, ownerId, sharedUser}
```

### **POST /albums/:id** <br>
Update an album <br>

Sample Response: <br>
```
{ name, description, ownerId, sharedUser}
```

### **POST /images** <br>
Add a new image <br>

Sample Response: <br>
```
{ message, newImage}
```

### **DELETE /albums/:id** <br>
Delete an album<br>

Sample Response: <br>
```
{ message, album}
```

### **DELETE /images/:id** <br>
Delete an Image<br>

Sample Response: <br>
```
{ message, images}
```

### **DELETE /v1/shareData/:id** <br>
Delete shared album data<br>

Sample Response: <br>
```
{ message, data}
```

---

## Contact
For bugs or feature requests, please reach out to gujwarpooja@gmail.com