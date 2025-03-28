import React, { ReactNode } from 'react';
// import { deletePersistStore } from '~/utils/localStorage';

// import NoData from '~/components/mobile/common/no-data';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
    }

    // Custom method for handling the click event
    handleClick() {
        // Your logic for handling the click event goes here
        console.log('Button clicked!');
        // deletePersistStore();
        window.location.reload();
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                // <NoData
                //     title="Oops..."
                //     sub_title="Sorry, Something went wrong. Try again"
                //     src="https://static.oxinis.com/healthmug/image/healthmug/error.webp"
                // />
                <div className="flex h-screen flex-col items-center justify-center gap-10 ">
                    <div>There is Error Boundary Component</div>
                    <div
                        onClick={this.handleClick}
                        className="bg-warning cursor-pointer rounded-md p-4"
                    >
                        Reload Page
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
