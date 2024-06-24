import { CollectionConfig } from "payload/types";

const GoogleUsers: CollectionConfig = {
  slug: "googleUsers",
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  auth: {
    verify: false,
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
      name: "sub",
      label: "sub",
      type: "text",
      admin: { readOnly: true, hidden: true },
      access: { update: () => false },
    },
    {
      name: "pictureURL",
      label: "pictureURL",
      type: "text",
      admin: { readOnly: true },
      access: { update: () => false },
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

export default GoogleUsers;
