import {Button} from '@/components/ui/button'


export default function GoogleButton() {
    const handleLogin = () => {
        window.location.href = '/auth/google'
    }

    return (
        <div className="flex items-center justify-between">
            <Button
            className={""}
            onClick={handleLogin}
            variant="outline"
            >
                <span>Login Dengan Google</span>
            </Button>
        </div>
    )
}
