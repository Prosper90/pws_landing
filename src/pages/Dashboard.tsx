import React, { useState, useEffect } from "react";
import { X, Download, Eye, Plus, LogOut } from "lucide-react";

interface Manufacturer {
  id: number;
  manufacturer_name: string;
  category: string;
  country: string;
  applicant_name: string;
  position: string;
  email: string;
  financing_type: string;
  status: string;
  submitted_at: string;
  pitch_deck_filename?: string;
  pitch_deck_original_name?: string;
}

interface CapitalProvider {
  id: number;
  organisation_name: string;
  organisation_type: string;
  country_of_registration: string;
  website?: string;
  contact_person_name: string;
  contact_person_title: string;
  contact_email: string;
  contact_phone: string;
  funding_size_range: string;
  investment_types: string[];
  sectors_of_interest: string[];
  project_stage_preferences: string[];
  preferred_report_frequency: string;
  status: string;
}

interface Contract {
  id: number;
  contract_number: string;
  investment_amount: string;
  investment_type: string;
  contract_start_date: string;
  contract_end_date?: string;
  status: string;
  reporting_frequency: string;
  created_at: string;
  manufacturer: Manufacturer;
}

interface ContractForm {
  manufacturerId: number;
  investmentAmount: number;
  investmentType: string;
  contractStartDate: string;
  contractEndDate?: string;
  reportingFrequency: string;
  termsAndConditions?: string;
}

const API_BASE = "http://localhost:5000/api";

const Dashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<CapitalProvider | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null
  );
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Data states
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [capitalProvider, setCapitalProvider] =
    useState<CapitalProvider | null>(null);

  // Modal states
  const [showContractModal, setShowContractModal] = useState(false);
  const [showManufacturerModal, setShowManufacturerModal] = useState(false);
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer | null>(null);

  // Form states
  const [contractForm, setContractForm] = useState<ContractForm>({
    manufacturerId: 0,
    investmentAmount: 0,
    investmentType: "",
    contractStartDate: "",
    contractEndDate: "",
    reportingFrequency: "Monthly",
    termsAndConditions: "",
  });

  // Filter states
  const [countryFilter, setCountryFilter] = useState("");
  const [matchInterests, setMatchInterests] = useState(false);

  // Loading states
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authToken) {
      loadUserProfile();
    }
  }, [authToken]);

  const loadUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.data.user);
        loadDashboardData();
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setCurrentUser(null);
    setActiveTab("overview");
  };

  const loadDashboardData = async () => {
    try {
      const [contractsRes, manufacturersRes, profileRes] = await Promise.all([
        fetch(`${API_BASE}/capital-providers/contracts`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(`${API_BASE}/capital-providers/manufacturers`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(`${API_BASE}/capital-providers/my-application`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ]);

      if (contractsRes.ok) {
        const contractsData = await contractsRes.json();
        setContracts(contractsData.data.contracts || []);
      }

      if (manufacturersRes.ok) {
        const manufacturersData = await manufacturersRes.json();
        setManufacturers(manufacturersData.data.manufacturers || []);
      }

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setCapitalProvider(profileData.data.application);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  // const loadManufacturers = async () => {
  //   try {
  //     const params = new URLSearchParams();
  //     if (countryFilter) params.append("country", countryFilter);
  //     if (matchInterests) params.append("matchInterests", "true");

  //     const response = await fetch(
  //       `${API_BASE}/capital-providers/manufacturers?${params}`,
  //       {
  //         headers: { Authorization: `Bearer ${authToken}` },
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       setManufacturers(data.data.manufacturers || []);
  //     }
  //   } catch (error) {
  //     console.error("Error loading manufacturers:", error);
  //   }
  // };

  const createContract = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/capital-providers/contracts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(contractForm),
      });

      if (response.ok) {
        alert("Contract created successfully!");
        setShowContractModal(false);
        resetContractForm();
        loadDashboardData();
      } else {
        const data = await response.json();
        alert("Error creating contract: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Error creating contract: Network error");
    } finally {
      setLoading(false);
    }
  };

  const resetContractForm = () => {
    setContractForm({
      manufacturerId: 0,
      investmentAmount: 0,
      investmentType: "",
      contractStartDate: "",
      contractEndDate: "",
      reportingFrequency: "Monthly",
      termsAndConditions: "",
    });
  };

  const openContractModal = (manufacturer: Manufacturer) => {
    setContractForm((prev) => ({ ...prev, manufacturerId: manufacturer.id }));
    setShowContractModal(true);
  };

  const viewManufacturer = (manufacturer: Manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setShowManufacturerModal(true);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      under_review: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      active: "bg-green-100 text-green-800",
      expired: "bg-gray-100 text-gray-800",
      nullified: "bg-red-100 text-red-800",
      terminated: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const activeContracts = contracts.filter((c) => c.status === "active");
  const totalInvestment = activeContracts.reduce(
    (sum, contract) => sum + parseFloat(contract.investment_amount),
    0
  );

  //   if (!authToken || !currentUser) {
  //     return (
  //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //         <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
  //           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
  //           <form onSubmit={handleLogin}>
  //             <div className="mb-4">
  //               <label className="block text-gray-700 text-sm font-bold mb-2">
  //                 Email
  //               </label>
  //               <input
  //                 type="email"
  //                 value={loginForm.email}
  //                 onChange={(e) =>
  //                   setLoginForm((prev) => ({ ...prev, email: e.target.value }))
  //                 }
  //                 required
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>
  //             <div className="mb-6">
  //               <label className="block text-gray-700 text-sm font-bold mb-2">
  //                 Password
  //               </label>
  //               <input
  //                 type="password"
  //                 value={loginForm.password}
  //                 onChange={(e) =>
  //                   setLoginForm((prev) => ({
  //                     ...prev,
  //                     password: e.target.value,
  //                   }))
  //                 }
  //                 required
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //             </div>
  //             <button
  //               type="submit"
  //               disabled={loading}
  //               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
  //             >
  //               {loading ? "Logging in..." : "Login"}
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Capital Provider Portal
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {currentUser?.contact_email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "manufacturers", label: "Browse Manufacturers" },
              { id: "contracts", label: "My Contracts" },
              { id: "profile", label: "My Profile" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 py-2 px-1 font-medium ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Active Contracts
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {activeContracts.length}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Investment
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  ${totalInvestment.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Available Manufacturers
                </h3>
                <p className="text-3xl font-bold text-purple-600">
                  {manufacturers.length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {contracts.slice(0, 5).map((contract) => (
                  <div
                    key={contract.id}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {contract.manufacturer.manufacturer_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {contract.investment_type} - $
                        {parseFloat(
                          contract.investment_amount
                        ).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        contract.status
                      )}`}
                    >
                      {contract.status}
                    </span>
                  </div>
                ))}
                {contracts.length === 0 && (
                  <p className="text-gray-500">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Manufacturers Tab */}
        {activeTab === "manufacturers" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Available Manufacturers
                </h3>
                <div className="flex space-x-4">
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">All Countries</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Senegal">Senegal</option>
                  </select>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={matchInterests}
                      onChange={(e) => setMatchInterests(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      Match my interests
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6">
              {manufacturers.length === 0 ? (
                <p className="text-gray-500">No manufacturers found</p>
              ) : (
                <div className="space-y-4">
                  {manufacturers.map((manufacturer) => (
                    <div
                      key={manufacturer.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {manufacturer.manufacturer_name}
                          </h4>
                          <p className="text-gray-600">
                            {manufacturer.category}
                          </p>
                          <p className="text-sm text-gray-500">
                            {manufacturer.country}
                          </p>
                          <p className="text-sm text-gray-500">
                            Applicant: {manufacturer.applicant_name} (
                            {manufacturer.position})
                          </p>
                          <p className="text-sm text-gray-500">
                            Financing Type: {manufacturer.financing_type}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => viewManufacturer(manufacturer)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => openContractModal(manufacturer)}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Contract
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === "contracts" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                My Contracts
              </h3>
            </div>
            <div className="p-6">
              {contracts.length === 0 ? (
                <p className="text-gray-500">No contracts found</p>
              ) : (
                <div className="space-y-4">
                  {contracts.map((contract) => (
                    <div
                      key={contract.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {contract.contract_number}
                          </h4>
                          <p className="text-gray-600">
                            {contract.manufacturer.manufacturer_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Amount: $
                            {parseFloat(
                              contract.investment_amount
                            ).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Type: {contract.investment_type}
                          </p>
                          <p className="text-sm text-gray-500">
                            Start:{" "}
                            {new Date(
                              contract.contract_start_date
                            ).toLocaleDateString()}
                          </p>
                          {contract.contract_end_date && (
                            <p className="text-sm text-gray-500">
                              End:{" "}
                              {new Date(
                                contract.contract_end_date
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span
                            className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                              contract.status
                            )}`}
                          >
                            {contract.status}
                          </span>
                          <p className="text-xs text-gray-500">
                            Created:{" "}
                            {new Date(contract.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Capital Provider Application
            </h3>
            {!capitalProvider ? (
              <p className="text-red-500">
                No capital provider application found. Please complete your
                application.
              </p>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      Organization Details
                    </h4>
                    <p>
                      <strong>Name:</strong> {capitalProvider.organisation_name}
                    </p>
                    <p>
                      <strong>Type:</strong> {capitalProvider.organisation_type}
                    </p>
                    <p>
                      <strong>Country:</strong>{" "}
                      {capitalProvider.country_of_registration}
                    </p>
                    {capitalProvider.website && (
                      <p>
                        <strong>Website:</strong>{" "}
                        <a
                          href={capitalProvider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          {capitalProvider.website}
                        </a>
                      </p>
                    )}
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={getStatusColor(capitalProvider.status)}>
                        {capitalProvider.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      Contact Person
                    </h4>
                    <p>
                      <strong>Name:</strong>{" "}
                      {capitalProvider.contact_person_name}
                    </p>
                    <p>
                      <strong>Title:</strong>{" "}
                      {capitalProvider.contact_person_title}
                    </p>
                    <p>
                      <strong>Email:</strong> {capitalProvider.contact_email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {capitalProvider.contact_phone}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Investment Profile
                  </h4>
                  <p>
                    <strong>Funding Range:</strong>{" "}
                    {capitalProvider.funding_size_range}
                  </p>
                  <p>
                    <strong>Investment Types:</strong>{" "}
                    {capitalProvider.investment_types.join(", ")}
                  </p>
                  <p>
                    <strong>Sectors:</strong>{" "}
                    {capitalProvider.sectors_of_interest.join(", ")}
                  </p>
                  <p>
                    <strong>Project Stages:</strong>{" "}
                    {capitalProvider.project_stage_preferences.join(", ")}
                  </p>
                  <p>
                    <strong>Report Frequency:</strong>{" "}
                    {capitalProvider.preferred_report_frequency}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contract Modal */}
      {showContractModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create Contract</h3>
              <button
                onClick={() => setShowContractModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={createContract}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  value={contractForm.investmentAmount || ""}
                  onChange={(e) =>
                    setContractForm((prev) => ({
                      ...prev,
                      investmentAmount: parseFloat(e.target.value),
                    }))
                  }
                  required
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Investment Type
                </label>
                <select
                  value={contractForm.investmentType}
                  onChange={(e) =>
                    setContractForm((prev) => ({
                      ...prev,
                      investmentType: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="Equity">Equity</option>
                  <option value="Debt">Debt</option>
                  <option value="Grant">Grant</option>
                  <option value="Guarantee">Guarantee</option>
                  <option value="Blended Finance">Blended Finance</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contract Start Date
                </label>
                <input
                  type="date"
                  value={contractForm.contractStartDate}
                  onChange={(e) =>
                    setContractForm((prev) => ({
                      ...prev,
                      contractStartDate: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Contract End Date
                </label>
                <input
                  type="date"
                  value={contractForm.contractEndDate || ""}
                  onChange={(e) =>
                    setContractForm((prev) => ({
                      ...prev,
                      contractEndDate: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Reporting Frequency
                </label>
                <select
                  value={contractForm.reportingFrequency}
                  onChange={(e) =>
                    setContractForm((prev) => ({
                      ...prev,
                      reportingFrequency: e.target.value,
                    }))
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="On Milestones">On Milestones</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Terms and Conditions
                </label>
                <textarea
                  value={contractForm.termsAndConditions || ""}
                  onChange={(e) =>
                    setContractForm((prev) => ({
                      ...prev,
                      termsAndConditions: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contract terms and conditions..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContractModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Contract"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manufacturer Details Modal */}
      {showManufacturerModal && selectedManufacturer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Manufacturer Details</h3>
              <button
                onClick={() => setShowManufacturerModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">
                  Basic Information
                </h4>
                <p>
                  <strong>Company:</strong>{" "}
                  {selectedManufacturer.manufacturer_name}
                </p>
                <p>
                  <strong>Category:</strong> {selectedManufacturer.category}
                </p>
                <p>
                  <strong>Country:</strong> {selectedManufacturer.country}
                </p>
                <p>
                  <strong>Email:</strong> {selectedManufacturer.email}
                </p>
                <p>
                  <strong>Financing Type:</strong>{" "}
                  {selectedManufacturer.financing_type}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={getStatusColor(selectedManufacturer.status)}>
                    {selectedManufacturer.status}
                  </span>
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Person</h4>
                <p>
                  <strong>Name:</strong> {selectedManufacturer.applicant_name}
                </p>
                <p>
                  <strong>Position:</strong> {selectedManufacturer.position}
                </p>
                <p>
                  <strong>Submitted:</strong>{" "}
                  {new Date(
                    selectedManufacturer.submitted_at
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
            {selectedManufacturer.pitch_deck_filename && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Pitch Deck</h4>
                <a
                  href={`${API_BASE.replace("/api", "")}/uploads/${
                    selectedManufacturer.pitch_deck_filename
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Pitch Deck
                </a>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowManufacturerModal(false);
                  openContractModal(selectedManufacturer);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Contract
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
