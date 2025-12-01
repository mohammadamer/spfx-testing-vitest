## Vitest Setup and Configuration
- We have to install and configure Vitest before it can be used to run your test. 
- So to get Vitest working, first we install it via npm. 
- Remember to save it as a dev dependency, both to make our project more organized and to prevent different devs working on the same application from accidentally using different versions of Vitest. 

- We use Vitest config file to configure specific things about our Vitest tests
    - Where our test files are located.
    - we can customize Vitest, not just in the config file, but via the command line as well, which gives us access to additional features such as code coverage, a UI, etc. 
-  What can you customize using your Vitest configuration? 
    - We can specify whether to include or exclude files
    - how to manage your dependencies
    - which reporters to use, for example, the HTML or JSON reporter
    - how to order your tests
    - what to do when tests fail or take a long time, and a variety of additional options.
    - Finally, you're advised to use the configuration reference for a full list of all the configuration settings.
    - The configuration reference is located at vitest.dev/config. 

---

1. Installation
The first crucial step is to install and configure Vitest before we can run any tests.
We install it simply using npm (or your preferred package manager).
Delivery Note: Make sure to mention the command briefly, e.g., npm install vitest --save-dev.
Crucial Best Practice: Remember to save it as a dev dependency (--save-dev).
This is key for organization.
More importantly, it ensures all developers working on the project use the same version of Vitest, preventing inconsistencies.

2. Configuration Options
To fine-tune our testing environment, we use the Vitest config file.
This is the central location to configure specifics about our tests.
We can specify key settings here, such as:
Where our test files are located (including or excluding specific paths).
How to manage dependencies during the test run.
Which reporters to use (e.g., HTML, JSON) for outputting test results.
How to order our tests.
What actions to take when tests fail or take too long (timeouts).

3. Customization Beyond the File
While the config file is essential, remember that Vitest can also be customized via the command line!
Using command-line flags gives us access to immediate, powerful features without changing files, such as:
Enabling code coverage generation.
Launching the built-in UI (User Interface) for visual test results.

4. Further Reference
The customization possibilities are extensive. For a full, comprehensive list of all configuration settings, I strongly advise you to check the official documentation.
The configuration reference is located at vitest.dev/config.


