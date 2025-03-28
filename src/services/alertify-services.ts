import { toast } from 'react-hot-toast';

const Alertify = {
    success: (alert_text, position = 'bottom-right') => {
        toast.dismiss();
        toast.success(alert_text, {
            position,
            style: {
                margin: '50px',
            },
        });
    },
    error: (alert_text, position = 'bottom-right') => {
        toast.dismiss();
        toast.error(alert_text, {
            position,
            style: {
                margin: '50px',
            },
        });
    },
    default: (alert_text, action_text, action_callback) => {
        toast.dismiss();
        // toast.show({
        //     text: alert_text,
        //     showAction: !!action_text,
        //     backgroundColor: '#464646',
        //     textColor: '#fff',
        //     actionText: action_text,
        //     actionTextColor: '#fb8903',
        //     onActionClick: action_callback,

        //     customClass: `text-base ${!action_text ? 'text-center' : null}`,
        //     pos: 'bottom-center',
        // });
    },
};

export default Alertify;
