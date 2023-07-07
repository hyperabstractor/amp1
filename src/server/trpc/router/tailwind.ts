//@ts-ignore
import { z } from "zod";
import fs from "fs";
import { procedure, router } from "../utils";

export default router({
  attach: procedure
    .input(z.object({ name: z.string(), classes: z.array(z.string()) }))
    .mutation(({ input }) => {
      const documentName = input.name;
      console.log("🎯", documentName);
      // if (!fs.existsSync(`./src/routes/tailwind/${documentName}.tsx`)) {
      //   // fs.writeFile(
      //   //   `./src/routes/tailwind/${documentName}.tsx`,
      //   //   '',
      //   //   function (err) {
      //   //     if (err) return console.log(err)
      //   //     console.log('Hello World > helloworld.txt')
      //   //   }
      //   // )
      // }
      // fs.unlinkSync(`./src/routes/exports/${documentName}.tsx`)
      // append to file
      fs.appendFile(
        `./src/routes/tailwind/${documentName}.html`,
        "\n" + input.classes.join("\n"),
        function (err) {
          if (err) return console.log(err);
          console.log("Hello World > helloworld.txt");
        }
      );

      // fs.writeFile(
      //   `./src/routes/exports/${componentName}.tsx`,
      //   input.code,
      //   function (err) {
      //     if (err) return console.log(err)
      //     console.log('Hello World > helloworld.txt')
      //   }
      // )
      return {
        message: `updated "${documentName}"`,
        success: true,
      };
    }),
});
