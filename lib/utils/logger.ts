// @ts-ignore
import chalk from 'chalk'

export const log: (msg: any, color?: string, dest?: string) => void = (
  msg = '',
  color = 'grey',
  dest = ''
) => {
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.magentaBright.bold('[YADFN] ') +
      chalk[color](msg + ' ') +
      chalk.dim(dest)
  )
}

export const error: (err: any) => void = (err) => {
  console.log(
    chalk.dim(new Date().toLocaleTimeString() + ' ') +
      chalk.redBright.bold('[YADFN] ') +
      chalk.red('error ') +
      chalk.dim(err.message)
  )
}
