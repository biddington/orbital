# Orbital

[https://bhoring.netlify.app](https://bhoring.netlify.app)

Orbital is a compiler and web app for Bohr-like visualistions of [electron configurations](https://en.wikipedia.org/wiki/Electron_configuration). The focus of the project being more about the design, interaction and easthetics than engineering or architecture, so there are definitely some shortcomings. 

Because the intention is to create somewhat of a learning app, not a strict compiler, it's possible to enter invalid electron configurations. The project currently only supports the first two levels of the periodic table (H -> Ne).

For the scope of this project a lenient compiler means the compiler only errors when it detects unsupported characters e.g. @,&,y, - anything not used to construct a simple shell e.g. "1s2", "2p3" (keeping in mind, "d" and "f" sub-shells are not currently supprted). So even incomplete shells "1", "2s", configurations in the wrong order "2s1, 1s1", or configurations with invalid electron counts "1s1 2s1", "1s2 2s5" will parse.

Whereas a strict compiler would only produce a parse tree if the configuration was perfectly correct would be helpful for verifying, it would be frustrating for learning as there would be not intermediate visualistion. Instead, by using a lenient compiler and returning an incomplete parse tree, we can provide a more seamless, intuitive visualiser that handles intermediate states by utilising the associated errors as a sort of metadata to "mark-up" the visualiser.
