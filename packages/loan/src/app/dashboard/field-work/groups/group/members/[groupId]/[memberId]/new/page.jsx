'use client';

import { useState } from 'react';
import { BASE_URL } from '@/helpers';
import { useCreateResource, useDependencyDropdown, useUploadMedia } from 'kifanga-ui-hooks';
import { DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper, DashboardMediaGroup, DashboardMediaModal, DashboardSelectInput, DashboardTextArea } from 'kifanga-ui-nav';
import { useParams, useRouter } from 'next/navigation';

export default function NewLoan() {
    const [formData, setFormData] = useState({
        Amount: '',
        Term: '',
        LoanPurpose: ''
    });
    const { groupId, memberId } = useParams();

    const INTEREST_RATE = 10;
    const totalRepayment = formData.Amount ? (parseFloat(formData.Amount) * (1 + INTEREST_RATE / 100)).toFixed(2) : '';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const [limit, setLimit] = useState(10);
    const {
        fileInputRef,
        data: dataUploaded,
        defaultImage,
        images,
        setDefaultImage,
        setImages,
        handleFileInputChange,
        handleIconClick,
        isUploadDisabled,
    } = useUploadMedia(BASE_URL, limit, 'loans');

    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const { data: dataCreated, createResource } = useCreateResource(BASE_URL, 'loans/create');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            Amount: parseFloat(formData.Amount),
            Term: parseInt(formData.Term, 10),
            LoanPurpose: formData.LoanPurpose,
            MemberID: parseInt(memberId, 10),
            GroupID: parseInt(groupId, 10),
            DefaultImage: [defaultImage],
            Images: images,
        };
        await createResource(newResource, `/dashboard/field-work/groups/group/members/${groupId}/${memberId}`);
    };

    const router = useRouter();
    
    const handleGoBack = () => {
        router.back();
    };

    return (
        <DashboardContainerWrapper>
            <DashboardHeading title="New Loan Application" />
            <DashboardFormWrapper>
                <DashboardInputWrapper>
                    <DashboardInput
                        label="Loan Amount"
                        name="Amount"
                        value={formData.Amount}
                        onChange={handleChange}
                        placeholder="1000"
                        width="md:w-1/2"
                        error={dataCreated.error?.Amount}
                    />
                    <DashboardInput
                        label="Loan Term (days)"
                        name="Term"
                        value={formData.Term}
                        onChange={handleChange}
                        placeholder="14"
                        type="number"
                        width="md:w-1/2"
                        error={dataCreated.error?.Term}
                    />
                </DashboardInputWrapper>
                <DashboardInputWrapper>
                    <DashboardTextArea
                        label="Loan Purpose"
                        name="LoanPurpose"
                        value={formData.LoanPurpose}
                        onChange={handleChange}
                        placeholder="Business Expansion"
                        width="md:w-2/3"
                        error={dataCreated.error?.LoanPurpose}
                    />
                </DashboardInputWrapper>
                <DashboardMediaGroup
                    handleFileInputChange={handleFileInputChange}
                    isUploadDisabled={isUploadDisabled}
                    dataUploaded={dataUploaded}
                    handleIconClick={handleIconClick}
                    handleModalOpen={handleModalOpen}
                    fileInputRef={fileInputRef}
                    defaultImage={defaultImage}
                    iconText={`Max Images (${limit})`}
                />
                <DashboardMediaModal url ={BASE_URL} id="media" setDefaultImage={setDefaultImage} setImages={setImages} showModal={showModal} setShowModal={setShowModal} images={images} defaultImage={defaultImage} />
                <DashboardInputWrapper>
                <div className="space-y-3 text-lg">
                    <div className="flex justify-between">
                        <span className="font-semibold">Loan Amount:</span>
                        <span>kes {formData.Amount || '0.00'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Interest Rate:</span>
                        <span>{INTEREST_RATE}%</span>
                    </div>
                    <div className="flex justify-between text-green-600 font-bold">
                        <span>Total Repayment:</span>
                        <span>Kes {totalRepayment || '0.00'}</span>
                    </div>
                </div>
                </DashboardInputWrapper>
                <DashboardButtonGroup 
                    onSubmit={handleSubmit} 
                    onGoBack={handleGoBack}
                    loading={dataCreated.loading} 
                />
            </DashboardFormWrapper>
        </DashboardContainerWrapper>
    );
}