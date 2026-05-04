"use server";

import fs from "fs/promises";
import path from "path";

const ORDERS_FILE = path.join(process.cwd(), "orders.json");

export async function saveOrder(orderData) {
  try {
    // Read existing orders
    const fileData = await fs.readFile(ORDERS_FILE, "utf-8");
    const orders = JSON.parse(fileData);

    // Add new order with a unique ID
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      status: "pending", // New orders start as pending
    };

    orders.push(newOrder);

    // Save back to file
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
    
    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to save order" };
  }
}

export async function getOrders() {
  try {
    const fileData = await fs.readFile(ORDERS_FILE, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
}
