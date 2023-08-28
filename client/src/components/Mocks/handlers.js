import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:4000/venues", (req, res, ctx) => {
    console.log("Mock request intercepted:", req.url.href);
    return res(
      ctx.json([
        {
          _id: "64d2c0892dce8970b265c566",
          type: "Cosy_Pub",
          name: "The Chesham",
          location: "Brighton, United Kingdom",
          vibes: 0,
          image:
            "http://www.royaloaklondon.co.uk/wp-content/uploads/2014/10/royal-oak-1.jpg",
          timestamp: "2023-08-08T22:24:09.237Z",
          checkin_timestamp: "1691533449237",
          __v: 0,
        },
        {
          _id: "64d2c0892dce8970b265c326",
          type: "Cosy_Pub",
          name: "The Kenton Arms",
          location: "London, United Kingdom",
          vibes: 2,
          image:
            "http://www.royaloaklondon.co.uk/wp-content/uploads/2014/10/royal-oak-1.jpg",
          timestamp: "2023-08-08T22:24:09.237Z",
          checkin_timestamp: "1291533440235",
          __v: 1,
        },
      ])
    );
  }),
];
