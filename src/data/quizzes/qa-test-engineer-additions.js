export const additions = {
  beginner: [
    {
      question: 'According to the "Software Testing Explained in 100 Seconds" video, which analogy best describes what end-to-end testing does?',
      options: [
        'A code review that checks each function for correctness',
        'A robot that performs all the manual testing a human would do by clicking buttons and filling out forms in a simulated browser',
        'A static analyser that checks code without executing it',
        'A database validator that checks data integrity across tables'
      ],
      correctIndex: 1,
      explanation: 'The video describes end-to-end testing as "like having a robot to do all your manual testing for you" — it runs in a mock browser or device and simulates actual user behaviours such as clicking buttons and filling out forms. This captures the key idea that E2E tests replicate real user journeys through the full application stack, unlike unit tests that verify isolated functions.'
    },
    {
      question: 'In the "JavaScript Testing Introduction Tutorial", why does the instructor emphasise writing tests that check both the correct case and the opposite (or different-input) case?',
      options: [
        'To increase code coverage metrics without additional effort',
        'To avoid false positives — a function that always returns the same hardcoded value will pass a single assertion, but a second test with different inputs will expose the bug',
        'To satisfy the requirement that every test file must contain at least two tests',
        'Because assertion libraries like Jest require paired tests for each function'
      ],
      correctIndex: 1,
      explanation: 'The video demonstrates exactly this failure mode: after accidentally hardcoding a return value, the first test still passed because the expected output matched the hardcoded value. Only by adding a second test with different inputs (an empty name and null age) was the false positive exposed. This teaches that a single happy-path test is insufficient — you must check for the opposite or a different set of arguments to rule out accidental correctness.'
    },
    {
      question: 'The "Software Testing Explained in 100 Seconds" video mentions test-driven development (TDD). What does it say about TDD?',
      options: [
        'TDD eliminates the need for manual testing entirely',
        'TDD is scientifically proven to reduce defects and improve the maintainability of a codebase, but it does require some additional effort',
        'TDD is only suitable for backend code, not frontend applications',
        'TDD requires writing tests after the code is deployed to production'
      ],
      correctIndex: 1,
      explanation: 'The video states directly that test-driven development is "scientifically proven to reduce defects and improve the maintainability of a code base" but acknowledges that "it does require some additional effort." This balanced framing is important: TDD has genuine, measurable benefits, but it changes the workflow and requires discipline to adopt consistently.'
    },
  ],
  mid: [
    {
      question: 'According to the "JavaScript Testing Introduction Tutorial", what is the key distinction between a unit test and an integration test?',
      options: [
        'Unit tests use Jest; integration tests use a different framework',
        'Unit tests test a fully isolated piece of code with no dependencies; integration tests test how units work together, including interactions between functions that depend on each other',
        'Unit tests run in Node.js; integration tests run in a browser',
        'Unit tests check individual lines of code; integration tests check entire files'
      ],
      correctIndex: 1,
      explanation: 'The tutorial is precise about this distinction: a unit test verifies a single isolated unit (a function that takes input and returns output with no dependencies), while an integration test checks that two or more units work together correctly. The video\'s example of "check-and-generate" (which calls both validate-input and generate-text internally) illustrates integration testing: even if both units work individually, a logical error in how they are combined — such as inverting a conditional — will cause the integration test to fail while both unit tests still pass.'
    },
    {
      question: 'In the "Docker in 100 Seconds" video, what problem does Docker primarily solve for developers and QA engineers?',
      options: [
        'It speeds up the compilation of application source code',
        'It provides a visual interface for managing databases',
        'It reproduces environments consistently, solving the "it works on my machine" problem by packaging software with its dependencies into an image that runs identically anywhere',
        'It automatically writes unit tests for any Node.js application'
      ],
      correctIndex: 2,
      explanation: 'The video explicitly states that "the whole point of Docker is to solve problems like this by reproducing environments." The scenario it describes is familiar to QA engineers: an application works on the developer\'s machine but breaks on another machine with a different version of Node or different installed dependencies. A Docker image captures the exact environment as an immutable snapshot, ensuring that every developer, CI server, and test environment runs identical software stacks.'
    },
    {
      question: 'The "Docker in 100 Seconds" video describes Docker Compose. What specific problem does Docker Compose solve that a single Dockerfile cannot?',
      options: [
        'Docker Compose allows you to run containers on remote cloud servers',
        'Docker Compose manages running multiple containers together — for example, an application container and a database container — as a coordinated unit that starts and stops together',
        'Docker Compose generates Dockerfiles automatically from source code',
        'Docker Compose replaces the need for port forwarding when accessing a container'
      ],
      correctIndex: 1,
      explanation: 'The video introduces Docker Compose with the scenario where "your node app also needs to access a MySQL database." A single Dockerfile only defines one container. Docker Compose defines multiple services in a YAML file — the application, the database, and any volumes — and starts them all with "docker compose up" and shuts them all down with "docker compose down." For QA engineers, this is the standard pattern for spinning up a complete, isolated test environment that includes the application and all its dependencies in a single command.'
    },
  ],
  senior: [
    {
      question: 'The "JavaScript Testing Introduction Tutorial" demonstrates end-to-end testing with Puppeteer. What specific capability does Puppeteer provide that unit and integration tests cannot?',
      options: [
        'Puppeteer can run tests faster than Jest by parallelising execution',
        'Puppeteer launches a real (or headless) browser, executes the full user flow including DOM interactions, and can assert on the actual rendered page content — verifying the entire stack from UI to backend',
        'Puppeteer generates test data automatically from the application schema',
        'Puppeteer replaces the need for assertion libraries by using browser-native APIs'
      ],
      correctIndex: 1,
      explanation: 'The tutorial shows Puppeteer opening a Chromium browser, navigating to the application URL, clicking into inputs, typing values, clicking the submit button, and then evaluating the resulting DOM to confirm that the correct element with the expected text content was created. This exercises every layer: the JavaScript event handlers, the DOM manipulation logic, and the rendered output. The tutorial also shows that Puppeteer can be run headlessly (without a visible window) for CI pipelines, or with a head (showing the browser) for debugging — and the video demonstrates the value of this when an error was discovered during the test run that would not have been caught by unit or integration tests alone.'
    },
    {
      question: 'Based on the "JavaScript Testing Introduction Tutorial", why does writing modular, testable code matter beyond just making tests easier to write?',
      options: [
        'Modular code reduces the binary file size of the deployed application',
        'Writing modular code is required by Jest and will cause test runner errors if not followed',
        'Being forced to write code that can be split into testable units drives better overall architecture: smaller, focused, loosely coupled modules that are easier to manage, reuse, and maintain',
        'Modular code allows tests to skip the compilation step, making the test suite faster'
      ],
      correctIndex: 2,
      explanation: 'The tutorial makes this point explicitly: writing testable code forces you to write modular code, "and ultimately it will make working with our code easier and it improves our code therefore since we are forced to follow certain patterns." The video demonstrates this by extracting logic from the add-user function into a separate check-and-generate function — not just to enable testing, but because the extraction produced a cleaner, more reusable design. For senior QA engineers, this is important: the value of test automation extends beyond defect detection to architectural improvement through the design pressure that writing tests creates.'
    },
    {
      question: 'In the "Docker in 100 Seconds" video, why does the instructor recommend copying package.json and running npm install BEFORE copying the rest of the application source code in a Dockerfile?',
      options: [
        'Because npm install must always be the first command in any Dockerfile by convention',
        'To exploit Docker\'s layer caching: since dependencies change infrequently, installing them first means Docker can reuse the cached layer on subsequent builds when only source code has changed, dramatically reducing build time',
        'Because the source code cannot be copied until the node_modules directory already exists',
        'To ensure the application can start before the source code is fully available'
      ],
      correctIndex: 1,
      explanation: 'The video explains this directly: "in Docker we actually want to install our dependencies first so they can be cached" and "we don\'t want to have to reinstall all of our node modules every time we change our app source code." Docker builds images layer by layer and caches unchanged layers. If source code is copied before running npm install, every source code change invalidates the npm install layer and forces a full dependency reinstall. Copying package.json first and running npm install means the dependency layer is only invalidated when package.json changes — which is far less frequent than application code changes. For QA engineers managing CI pipelines, this technique can reduce test environment build times from minutes to seconds.'
    },
  ],
}
