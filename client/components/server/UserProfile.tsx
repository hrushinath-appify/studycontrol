import { getUser } from '@/lib/dal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function UserProfile() {
  const user = await getUser()

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>
          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{user.name}</span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </div>
    </div>
  )
}
