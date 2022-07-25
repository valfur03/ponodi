import router from 'next/router';
import styled from 'styled-components';

const StyledDashboard = styled.div`
`;

export function Dashboard() {
	if (typeof window === 'undefined') return <StyledDashboard></StyledDashboard>;
	const access_token = localStorage.getItem('access_token');
	const username = localStorage.getItem('username');
	if (access_token === null || username === null) {
		router.replace('/');
		return <StyledDashboard></StyledDashboard>;
	}
  return (
    <StyledDashboard>
      <h1>Welcome,</h1>
	  <h2>{ username }</h2>
    </StyledDashboard>
  );
}

export default Dashboard;
