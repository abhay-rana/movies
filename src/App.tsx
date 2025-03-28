import React from 'react';
import Container from '~/components/container.js/container';
import ErrorBoundary from '~/components/container.js/error-boundary';
import Routes from '~/routes/routes';

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <Container>
                <Routes />
            </Container>
        </ErrorBoundary>
    );
};

export default App;
