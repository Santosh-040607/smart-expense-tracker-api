# AI Usage Notes

## AI Tools Used
- ChatGPT (OpenAI)

## How AI Was Used

I used ChatGPT primarily as a planning and mentoring tool rather than a
single-shot code generator. Instead of asking for the whole project at once,
I gave it a structured prompt instructing it to act as a mentor: explain
each design decision before writing code, work one feature at a time, and
wait for me to confirm before moving on. This shaped the actual build order,
which is reflected in the commit history (`chore` → `feat` per endpoint →
`test`):

1. **Architecture & folder structure** — AI proposed the layered structure
   (routes → controllers → services → middleware → utils) and the initial
   `package.json` setup. I reviewed the proposed layout against the
   assignment's required top-level structure (`README.md`, `AI_NOTES.md`,
   `src/`, `tests/`) before adopting it.
2. **Endpoint-by-endpoint implementation** — For each endpoint
   (create, get all, filter by category, summary, delete), AI suggested an
   approach and a first draft; I wrote/adjusted the actual controller and
   service logic and tested each one manually (via curl/Swagger) before
   committing.
3. **Validation** — AI suggested `express-validator` over manual
   `if` checks for cleaner, declarative validation. I implemented and
   wired up the validator middleware myself.
4. **Error handling** — AI suggested a centralized error-handling
   middleware instead of scattering try/catch blocks across controllers.
   I implemented this pattern across all routes.
5. **Swagger/OpenAPI (bonus)** — AI walked me through `swagger-ui-express`
   setup; I wrote the actual schema definitions for each endpoint and
   verified them by exercising every route through the Swagger UI.
6. **Git workflow** — AI suggested using Conventional Commits
   (`feat:`, `test:`, `chore:`, `docs:`) instead of one large commit, which
   I followed throughout.
7. **README structure** — AI suggested the sections to include
   (installation, run/test commands, endpoints, architecture). I wrote the
   actual content and verified every command in it on a clean checkout.

## What I Validated, Tested, or Changed

- Ran `npm install` and `npm test` on a fresh clone (not just my working
  directory) to confirm the documented commands actually work end-to-end.
- Manually exercised every endpoint through Swagger UI, including edge
  cases (invalid payloads, deleting a non-existent ID) to confirm the
  behavior matched what the tests claimed.
- Wrote the actual business logic in `services/` and `controllers/` myself;
  AI's role there was suggesting structure and catching things I'd missed,
  not producing logic I dropped in unreviewed.

## AI Suggestions I Did Not Use

AI recommended several additions as "nice to have," which I deliberately
left out:
- `.env`-based configuration and a `PORT` environment variable
- A structured logging library (winston/pino) in place of `console.error`
- ESLint/Prettier setup
- Pagination, sorting, and multi-field filtering
- A `PUT`/`PATCH` update endpoint

I skipped these because they weren't required by the assignment, and with
a 48-hour window I prioritized making sure what I'd already built and
tested stayed stable rather than adding new surface area close to the
deadline. I also declined AI's early suggestion to consider MongoDB,
since the assignment explicitly called for file-based storage.

## Reflection

Using AI as a planning/mentoring layer rather than a code-generation
shortcut meant I understood why each piece existed (why services are
separate from controllers, why centralized error handling instead of
per-route try/catch) well enough to explain it in an interview — not just
that it worked.
