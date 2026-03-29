import { UserAvatarButton } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function UserAvatarButtonPage() {
  return (
    <div>
      <h1>UserAvatarButton</h1>
      <p>Avatar circle displaying a user initial with a deterministic background color. Useful for account menus and user indicators.</p>

      <h2>Different Names</h2>
      <Demo code={`<UserAvatarButton name="Alice" />\n<UserAvatarButton name="Bob" />\n<UserAvatarButton name="Charlie" />\n<UserAvatarButton name="Diana" />`}>
        <UserAvatarButton name="Alice" />
        <UserAvatarButton name="Bob" />
        <UserAvatarButton name="Charlie" />
        <UserAvatarButton name="Diana" />
      </Demo>

      <h2>Empty Name</h2>
      <Demo code={`<UserAvatarButton name="" />`}>
        <UserAvatarButton name="" />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'name', type: 'string', description: 'User name. The first character is displayed as the initial. Controls the deterministic background color (required).' },
          { name: '...rest', type: 'ButtonHTMLAttributes (except children)', description: 'All standard button attributes except children.' },
        ]}
      />
    </div>
  );
}
