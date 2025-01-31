export interface IOptionalAddonsType {
  digitalTicket?: boolean;
  smsTicket?: boolean;
  basicProtection?: boolean;
  vipProtection?: boolean;
}
export const addonCost = {
  digitalTicket: 0,
  smsTicket: 5.0,
  basicProtection: 15.0,
  vipProtection: 35.0,
};

export const addonOptions = [
  {
    value: "digitalTicket",
    label: "Digital Ticket",
    cost: addonCost?.digitalTicket,
  },
  {
    value: "smsTicket",
    label: "SMS Ticket",
    cost: addonCost?.smsTicket,
  },
  {
    value: "basicProtection",
    label: "Basic Protection",
    cost: addonCost?.basicProtection,
  },
  {
    value: "vipProtection",
    label: "VIP Protection",
    cost: addonCost?.vipProtection,
  },
];
