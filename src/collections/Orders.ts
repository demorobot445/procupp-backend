import { CollectionConfig } from "payload/types";

const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === "create") {
          let user = await req.payload.findByID({
            collection: "users",
            id: doc.orderBy,
          });
          await req.payload.sendEmail({
            to: user.email,
            from: process.env.SMTP_USER,
            subject: "Order Confirmation",
            html: `<h1>Thank you for your order!</h1>
              <p>Here is your order summary:</p>
              <ul>
                ${doc.cart.map(
                  (item) => `<li>${item.name} - ${item.price}</li>`
                )}
              </ul>
              <p>Total: ${doc.total}</p>
            `,
          });
        }
      },
    ],
  },
  fields: [
    {
      name: "orderBy",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "0",
      admin: {
        position: "sidebar",
      },
      options: [
        { label: "Order Confirm", value: "0" },
        { label: "Shipped", value: "1" },
        { label: "Out of Delivery", value: "2" },
        { label: "Delivered", value: "3" },
      ],
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "trackId",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "cart",
      type: "array",
      fields: [
        {
          name: "productImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "sourceImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "price",
          type: "number",
          required: true,
        },
        {
          name: "quantity",
          type: "number",
        },
        {
          name: "printOnBothSide",
          type: "checkbox",
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: "discount",
      type: "number",
    },
    {
      name: "delivery",
      type: "number",
    },
    {
      name: "tax",
      type: "number",
    },
    {
      name: "total",
      label: "Total Price",
      type: "number",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "deliveryDate",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "d MMM yyy",
        },
      },
    },
    {
      name: "shippedDate",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "d MMM yyy",
        },
      },
    },
    {
      name: "outOfDeliveryDate",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "d MMM yyy",
        },
      },
    },
  ],
};

export default Orders;
