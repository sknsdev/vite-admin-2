import { Avatar, Text } from "@mantine/core"
import classes from './CollapsedUserPopOverContent.module.css'
import { useRootStore } from '@/store/hook'

export default function CollapsedUserPopOverContent() {
  const { authStore } = useRootStore()
  const { fullName, email } = authStore.user
  const firstNameInitial = fullName!.split(' ')[0][0]
  const lastNameInitial = fullName!.split(' ')[1][0]

  return (
    <>
      <div className={classes.contentWrapper}>
        <Avatar color={'blue'} radius={'lg'}>{firstNameInitial + lastNameInitial}</Avatar>
        <div>
          <Text style={{ fontWeight: 'bold' }} size="md">
            {fullName}
          </Text>
          <Text size="xs">
            {email}
          </Text>
        </div>
      </div>
    </>
  )
}
