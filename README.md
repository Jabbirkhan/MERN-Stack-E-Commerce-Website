# MERN Stack E-Commerce Website

### Full-featured e-commerce platform with separate admin panel and customer frontend

---

## Introduction

This is a **MERN stack e-commerce application** built using **React**, **Express**, **Mongoose**, and **Tailwind CSS**. The project is divided into three separate applications: **Frontend**, **Admin Panel**, and **Backend**. It features advanced product management, order handling, and subscription management for administrators, while customers enjoy a modern shopping experience with product browsing, filtering, cart management, and checkout functionality. **Cloudinary** is used for secure and efficient image storage.

---

## Key Points

* **Frontend:** React + Tailwind CSS with responsive design
* **Backend:** Express + Mongoose for API and database handling
* **Database:** MongoDB with Mongoose ODM
* **Image Hosting:** Cloudinary integration for media storage
* **Separate Admin Panel** for complete store management
* Advanced filtering, sorting, and search functionality
* Fully responsive design for all devices

---

## Admin Panel Features

* Add, update, and delete products with Cloudinary image uploads
* View and manage product list
* Manage customer orders
* Manage and delete user subscriptions

---

## Frontend Features

* View latest and best seller collections
* Filter products by category and type
* Sort products by price (low-to-high, high-to-low)
* Search products instantly
* Product detail pages
* Add to cart, checkout, and place orders
* User authentication (login & logout)

---

## Installation Guide

To run locally, clone the project:

```bash
git clone https://github.com/Jabbirkhan/MERN-Stack-E-Commerce-Website.git
```

### Backend

```bash
cd backend
npm install
```

Create `.env` with MongoDB URI, Cloudinary keys, JWT secret, etc., then start:

```bash
npm run server
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Admin Panel

```bash
cd admin
npm install
npm run dev
```