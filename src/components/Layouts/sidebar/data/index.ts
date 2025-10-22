import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "DASHBOARD",
    items: [
      {
        title: "Overview",
        icon: Icons.HomeIcon,
        url: "/",
        items: [],
      },
    ],
  },
  {
    label: "ORDER MANAGEMENT",
    items: [
      {
        title: "Orders",
        icon: Icons.Table,
        items: [
          {
            title: "All Orders",
            url: "/orders",
          },
          {
            title: "Pending",
            url: "/orders/pending",
          },
          {
            title: "In Progress",
            url: "/orders/in-progress",
          },
          {
            title: "Ready",
            url: "/orders/ready",
          },
          {
            title: "Completed",
            url: "/orders/completed",
          },
        ],
      },
      {
        title: "Shipments",
        icon: Icons.Calendar,
        items: [
          {
            title: "All Shipments",
            url: "/shipments",
          },
          {
            title: "Pending Pickups",
            url: "/shipments/pending-pickups",
          },
          {
            title: "Pending Deliveries",
            url: "/shipments/pending-deliveries",
          },
        ],
      },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      {
        title: "Services",
        icon: Icons.Alphabet,
        url: "/services",
        items: [],
      },
      {
        title: "Promotions",
        icon: Icons.PieChart,
        url: "/promotions",
        items: [],
      },
      {
        title: "Branches",
        icon: Icons.FourCircle,
        url: "/branches",
        items: [],
      },
    ],
  },
  {
    label: "USER MANAGEMENT",
    items: [
      {
        title: "Users",
        icon: Icons.User,
        items: [
          {
            title: "All Users",
            url: "/users",
          },
          {
            title: "Customers",
            url: "/users/customers",
          },
          {
            title: "Staff",
            url: "/users/staff",
          },
        ],
      },
      {
        title: "Shippers",
        icon: Icons.User,
        url: "/shippers",
        items: [],
      },
    ],
  },
  {
    label: "REPORTS",
    items: [
      {
        title: "Statistics",
        icon: Icons.PieChart,
        items: [
          {
            title: "Revenue",
            url: "/reports/revenue",
          },
          {
            title: "Top Customers",
            url: "/reports/top-customers",
          },
        ],
      },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Settings",
        url: "/pages/settings",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Sign Out",
        icon: Icons.Authentication,
        url: "/auth/sign-out",
        items: [],
      },
    ],
  },
];
