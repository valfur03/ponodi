import styled from 'styled-components';
import { SignInWithButton } from '@ponodi/ui';
import { Pocket } from '@ponodi/icons';

const StyledPage = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export function Index() {
	return (
		<StyledPage>
			<SignInWithButton color="#ef4056" icon={Pocket} text="surface" service="Pocket" /*variants="filled"*/ />
		</StyledPage>
	);
}

export default Index;
