# CajonBot 
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

> A Discord bot for handling messages

I wanted to replicate some code used in a Slack channel, this is that replication in the works.

## Usage

```
!help
```

outputs

```
This is the help
!acronym word makes an acronym for word given
!bang @person Supportive text for an overworked employee.
!clap some sentence Caps lock and clap backs.
!docs string Searchs the ServiceNow docs for the string provided.
!emoji string makes the sentence fun and hard to read with emojis
!flip string Or !invert, flips the string upside down.
!insult Says an SN-related insult.
!jace string Searchs jaces blog for the string provided.
!job Creates a random message a SN Dev may receive from a recruiter.
!lmgtfy string let me google that for you.
!ping test ....
++ string Give points away
!snprotips or !prof or !tips string Searchs snprotips blog for the string provided.
!help lists all commands
```

## Contributing

1. Fork it (https://github.com/jacebenson/cajonbot/fork)
1. Create your feature branch (git checkout -b feature/fooBar)
1. Commit your changes (git commit -am 'Add some fooBar')
1. To Test, run `node chat` 
   - Open http://localhost:3000
   - Enter your commands to test
1. Push to the branch (git push origin feature/fooBar)
1. Create a new Pull Request

### To add your new commands
I'd copy `./responses/snprotips.js` if you need multiple phrases to look for, otherwise, I'd copy `./responses/docs.js`

In those you'll have a `modules.exports` that has a `command`, and `help`.  Those are all that's needed to make this work.  You have access to all the Eris things via the `bot` variable and all the message things via the `msg` variable.

## Installing on a Discord server;

Use [this](https://discordapp.com/oauth2/authorize?&client_id=490235035627028511&scope=bot&permissions=0) link to install this on your workspace.

## Acknowledgments

Thanks [@earlduque](https://github.com/earlduque) for the inspiring repo for you're slacker bot (now private)

## See Also
- [`abalabahaha/eris`](https://github.com/abalabahaha/eris)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/MBahrSNC"><img src="https://avatars2.githubusercontent.com/u/9096072?v=4" width="100px;" alt="MBahrSNC"/><br /><sub><b>MBahrSNC</b></sub></a><br /><a href="https://github.com/jacebenson/cajunbot/commits?author=MBahrSNC" title="Code">💻</a></td>
    <td align="center"><a href="https://blog.jace.pro"><img src="https://avatars3.githubusercontent.com/u/638764?v=4" width="100px;" alt="Jace"/><br /><sub><b>Jace</b></sub></a><br /><a href="https://github.com/jacebenson/cajunbot/commits?author=jacebenson" title="Code">💻</a> <a href="#ideas-jacebenson" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!