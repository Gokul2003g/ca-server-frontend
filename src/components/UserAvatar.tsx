export function UserAvatar({ session }) {
  return (
    <div>
      <img
        src={
          session?.user?.image ?? "https://source.boringavatars.com/marble/120"
        }
        alt="User Avatar"
      />
    </div>
  )
}
