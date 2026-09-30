import { useSearchParams } from "react-router-dom";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import SettingsSidebar from "../Components/SettingsSidebar";
import AppearanceSettings from "../Components/AppearanceSettings";
import ProfileSettings from "../Components/ProfileSettings";

export default function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const section =
    searchParams.get("tab") === "profile"
      ? "profile"
      : "appearance";

  const handleSectionChange = (value: string) => {
    setSearchParams(
      value === "appearance"
        ? {}
        : { tab: value }
    );
  };

  return (
    <PageContainer>
      <Section
        title="Settings"
        description="Manage your Deskentra preferences."
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          <SettingsSidebar
            activeSection={section}
            onSectionChange={handleSectionChange}
          />

          <div>
            {section === "appearance" && (
              <AppearanceSettings />
            )}

            {section === "profile" && (
              <ProfileSettings />
            )}
          </div>
        </div>
      </Section>
    </PageContainer>
  );
}