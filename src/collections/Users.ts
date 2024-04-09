import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "profile",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "shippingAddress",
      type: "array",
      fields: [
        {
          name: "address",
          type: "text",
        },
        {
          name: "phone",
          type: "text",
        },
      ],
    },
  ],
};

export default Users;
