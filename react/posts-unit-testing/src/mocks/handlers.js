import { rest } from "msw";

import { apiUrl } from "../constants";

export const handlers = [
  rest.get(apiUrl, (req, res, ctx) => {
    return res(
      ctx.json({
        completed: false,
        id: 1,
        title: "delectus aut autem",
        userId: 1,
      })
    );
  }),
];
