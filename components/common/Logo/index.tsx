import Image from 'next/image';

import { LogoVariant } from './types';

export interface LogoProps {
  variant: LogoVariant;
}

export const Logo: React.FC<LogoProps> = ({ variant }) => (
  <Image
    priority
    layout="fill"
    alt="Logo"
    src={`/assets/images/logos/logo--${variant}.png`}
  />
);

export default Logo;
