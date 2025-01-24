# Activity: Mapping the Domain

⚠️ **In this activity, you will read a conversation between a Domain Expert and a developer responsible for creating the application. Your objective is to identify the entities and use cases for this application based on this conversation!**

---

## Conversation

**Dev:** Hello, thanks for participating in the interview. To start, what are the main features you would like to see in this inventory management system?  

**Domain Expert:** We need a solution that allows us to track each product individually, set minimum stock quantities, and receive alerts when we are running low on a specific product. It would also be helpful if we could view the sales and inventory history to make better purchasing decisions in the future.  

**Dev:** Got it. Could you give me an example of how you’d like the individual product tracking functionality to work?  

**Domain Expert:** We’d like to assign a unique identification number to each product so we can easily track its movements in our inventory. It would also be helpful to add extra information, such as size and color, to make the tracking even more precise.  

**Dev:** And about the minimum stock quantity functionality, how would you envision it working?  

**Domain Expert:** We’d like to set a minimum threshold for each product so that we receive an alert when the stock is getting close to running out. This would help us ensure we never run out of a popular product and also allow us to make more efficient orders.  

**Dev:** How would you like to receive these alerts? Via email, SMS, or some other method?  

**Domain Expert:** It would be great if we could receive alerts by email and also through a notification in our inventory management system.  

**Dev:** Understood. Regarding the sales and inventory history functionality, what kind of information would you like to see?  

**Domain Expert:** We’d like to see how many products we sold during a given period, the profit generated per product, and which products are performing best during each period. It would also be useful to observe inventory trends over time to help us make better purchasing decisions.  

**Dev:** Ok, and do you have any other functionalities you’d like to see in the system?  

**Domain Expert:** It would be very useful if the system could allow us to create and manage purchase orders automatically, based on the minimum stock quantities set and sales trends. It would also be great if we could integrate the system with our suppliers to receive automatic updates about the delivery times of new shipments.  

---

### What to Look For?

Based on the conversation above, you should be able to answer the following questions:

1. What are the **domain entities**?  
2. What are the **actions (use cases)** this application should have?