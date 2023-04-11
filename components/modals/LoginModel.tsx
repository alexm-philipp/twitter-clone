import useLoginModel from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModel from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";


const LoginModal = () => {
    const loginModal = useLoginModel();
    const registerModel = useRegisterModel();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const onToggle = useCallback(()=>{
        if (isLoading){
            return;
        }
        registerModel.onOpen();
        loginModal.onClose();
    },[isLoading, registerModel, loginModal])

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true);

             await signIn('credentials', {
                email,
                password
             })

            loginModal.onClose();

        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModal, email, password]);

    const bodyContent = (
        <div className="
        flex flex-col gap-4">
            <Input 
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
                value = {email}
                disabled = {isLoading}
            />
            
            <Input 
                placeholder="Password"
                type = 'password'
                onChange={(e)=>setPassword(e.target.value)}
                value = {password}
                disabled = {isLoading}
            />

        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>First time using Twitter-clone? 
                <span
                onClick = {onToggle}
                className="text-white cursor-pointer hover:underline">
                  Make an Account
                </span>
            </p>

        </div>
    )


    return (

        <Modal 
            disabled={isLoading}
            isOpen = {loginModal.isOpen}
            title = "Login"
            actionLabel="Sign In"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer = {footerContent}
        />
    )
}

export default LoginModal;