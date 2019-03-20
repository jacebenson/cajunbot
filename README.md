# CajonBot 

> A Discord bot for handling messages

I wanted to replicate some code used in a Slack channel, this is that replication in the works.

## Usage

```
!help
```

outputs

```
This is the help
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
1. Push to the branch (git push origin feature/fooBar)
1. Create a new Pull Request

### To add your new commands
I'd copy `./responses/snprotips.js` if you need multiple phrases to look for, otherwise, I'd copy `./responses/docs.js`

In those you'll have a `modules.exports` that has a `command`, and `help`.  Those are all that's needed to make this work.  You have access to all the Eris things via the `bot` variable and all the message things via the `msg` variable.

## Acknowledgments

Thanks [@earlduque](https://github.com/earlduque) for the inspiring repo for you're slacker bot (now private)

## See Also
- [`abalabahaha/eris`](https://github.com/abalabahaha/eris)
