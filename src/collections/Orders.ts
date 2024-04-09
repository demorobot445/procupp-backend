import { CollectionConfig } from "payload/types";

const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
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
          name: "product",
          type: "relationship",
          relationTo: "products",
        },
        {
          name: "quantity",
          type: "number",
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
  ],
};

export default Orders;
