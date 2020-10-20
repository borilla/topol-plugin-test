# [TOPOL.io plugin](https://topol.io/tariff-plugin)

[Github](https://tlapi.github.io/topol-editor/)

## Checklist

### Does it use MJML?

Yes, the tool is built on MJML. Email structure and templates are stored as standard
MJML JSON

### How much does it cost?

Pricing for the plugin depends on the count of unique users. In our case users equate
to instances. For each PBJ client we will probably need two users; one for the sandbox site
and one for the live site. The cost for up to 50 users is USD60 per month

### Can we add custom components; header, footer etc as per Glenn's designs?

Yes, we have the option to use [Premade Blocks](https://tlapi.github.io/topol-editor/#premade-blocks)
with our own MJML JSON [These can also be organised into categories such as "headers", "footers", etc],
or can also use [Saved Blocks](https://tlapi.github.io/topol-editor/#saved-blocks), where user can
select any section they have created and save it to be copied elsewhere later

We can also have custom fonts/colours for each client if we wish

### Can we inject Jet tags in text, `Hello {{first-name}}`?

Yes, can just inject as content in text or can use the `mergeTags` feature to show
as a list in text editor toolbar

### Can we inject Jet tags in links, `<a href="{{unsubscribe-url}}">`?

Yes, can just inject as content in text or can use the `mergeTags` feature to show
as a list in text editor toolbar

### Can we use Jet loops and branching, `{{if some-thing = true}}...{{end}}`?

We can insert "HTML" content items, which translate to [<mj-raw>](https://mjml.io/documentation/#mj-raw)
tags. However, it seems these can only be inserted as content and can't be inserted
in place of rows (eg if we want repeated sections). It's possible this could be achieved
using [Premade Blocks](https://tlapi.github.io/topol-editor/#premade-blocks)

### Can it be embedded in AdminUI?

Probably, we'll need to write a React wrapper and create [TypeScript declarations](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html) for the plugin

### Can it be styled to fit with AdminUI?

Styling is currently limited to "light" and "dark" themes

### How are image uploads handled?

Can use built-in image selector, which uses AWS, or can add or own: Set option `customFileManager: true`
and then handle callbacks from the plugin. Ultimately call `TopolPlugin.chooseFile(url)`
to select image

### Can we use custom fonts?

Yes, has built-in support for google fonts and we can set the list of fonts to include
when setting plugin options

### Can we show a side-by-side comparison of published and draft versions?

Unlikely, the preview is built into the editor. It's not clear that it could be used separately
