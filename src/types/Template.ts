interface ModuleInfo {
    Module: string;
    SystemInfoPath: string;
    EnvironmentInfoPath: string;
    Center: string;
    Organization: Organization[];
    Priority: any[];
    SystemAuthorizationLevel: SystemAuthorizationLevel[];
    SystemHierarchicalResponsibility: SystemHierarchicalResponsibility[];
    SystemManageProposedMethod: SystemManageProposedMethod[];
    SystemMeetingPlace: SystemMeetingPlace[];
    BaseDirectory: any[];
    Confidentiality: any[];
    IncomingTransform: IncomingTransform[];
    Templates: Template[];
}

interface Organization {
    Id:  number;
    Code: string;
    Name: string;
    CenterId: number;
}

interface SystemAuthorizationLevel {
    CenterId: number;
    DisplayOrder: number;
    ApprovalLevel: string;
    Value: number;
}

interface SystemHierarchicalResponsibility {
    OrganizationId: number;
    CenterId: number;
    Delegation: string;
    DisplayOrder: number;
}

interface SystemManageProposedMethod {
    OrganizationId: number;
    CenterId: number;
    ProposedMethod: string;
    DisplayOrder: number;
}

interface SystemMeetingPlace {
    OrganizationId: number;
    CenterId: number;
    MeetingPlace: string;
    DisplayOrder: number;
}

interface IncomingTransform {
    DocumentType: string;
    DtdYear: string;
    Enable: boolean;
    TransformXml: string;
}

interface Template {
    TemplateFullName: string;
    TemplateDescription: string;
    DocumentType: string;
    SubDocumentType: string;
    Version: string;
    TemplateXml: string;
    Exchangeable: boolean;
    TemplateType: string;
    DisplayOrder: number;
    Outgoing: boolean;
    ConvertFormat: boolean;
    SignType: number;
    CenterId: number;
    SiDiType: number;
}