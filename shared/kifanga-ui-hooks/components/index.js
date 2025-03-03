// Auth & User Management
import useAuth from "./useAuth";
import useLogin from "./useLogin";
import useRegister from "./useRegister";
import useActivate from "./useActivate";
import useForgotPassword from "./useForgotPassword";
import useReset from "./useReset";

// Resource Management (CRUD Operations)
import useCreateResource from "./useCreateResource";
import useFetchResource from "./useFetchResource";
import useFetchResourceNoAuth from "./useFetchResourceNoAuth";
import useResourceSingle from "./useResourceSingle";
import useResourceSinglePost from "./useResourceSinglePost";
import useResourceUpdate from "./useResourceUpdate";
import useResourceList from "./useResourceList";
import useCreateResourceNoAuth from "./useCreateResourceNoAuth";
import useFetchResourceOne from "./useFetchResourceOne";
import useResourceUpdateOne from "./useResourceUpdateOne";

// Form Management
import useRadio from "./useRadio";
import useRadioUpdate from './useRadioUpdate';
import useRadioOnOffUpdate from './useRadioOnOffUpdate';
import useCheckbox from "./useCheckbox";
import useCheckboxUpdate from "./useCheckboxUpdate";
import useCheckboxExtended from './useCheckboxExtended';
import useCheckboxExtendedUpdate from './useCheckboxExtendedUpdate';
import useRadioObject from "./useRadioObject";
import useRadioObjectExtended from "./useRadioObjectExtended";
import useDynamicFields from "./useDynamicFields";
import useDependencyDropdown from "./useDependencyDropdown";

// Media Management
import useUploadMedia from "./useUploadMedia";
import useDeleteMedia from "./useDeleteMedia";

// Utilities
import useClickOutside from "./useClickOutside";
import useDebounce from "./useDebounce";
import useLocalStorage from "./useLocalStorage";
import useCookies from "./useCookies";

// Dashboard & UI Management
import useDashboard from "./useDashboard";
import useStepper from "./useStepper";
import useKeypress from "./useKeypress";

// Others
import useComment from "./useComment";
import useResourceUpdateLoan from "./useResourceUpdateLoan";

// Exporting the grouped hooks
export {
    // Auth & User Management
    useAuth,
    useLogin,
    useRegister,
    useActivate,
    useForgotPassword,
    useReset,

    // Resource Management (CRUD Operations)
    useCreateResource,
    useFetchResource,
    useFetchResourceNoAuth,
    useResourceSingle,
    useResourceSinglePost,
    useResourceUpdate,
    useResourceList,
    useCreateResourceNoAuth,
    useFetchResourceOne,
    useResourceUpdateOne,

    // Form Management
    useRadio,
    useRadioUpdate,
    useRadioOnOffUpdate,
    useCheckbox,
    useCheckboxUpdate,
    useCheckboxExtended,
    useCheckboxExtendedUpdate,
    useRadioObject,
    useRadioObjectExtended,
    useDynamicFields,
    useDependencyDropdown,

    // Media Management
    useUploadMedia,
    useDeleteMedia,

    // Utilities
    useClickOutside,
    useDebounce,
    useLocalStorage,
    useCookies,

    // Dashboard & UI Management
    useDashboard,
    useStepper,
    useKeypress,

    // others
    useComment,
    useResourceUpdateLoan,
};
