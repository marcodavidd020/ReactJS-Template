import React, { useState } from "react";
import Card from "../../../common/components/Card";
import Container from "../../../common/components/Container";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import ProfileHeader from "../components/ProfileHeader";
import ProfileForm from "../components/ProfileForm";
import ProfileInfo from "../components/ProfileInfo";
import ProfileSidebar from "../components/ProfileSidebar";
import { useUser } from "../hooks/useUser";

/**
 * Página de perfil de usuario que permite visualizar y editar información personal
 */
const ProfilePage: React.FC = () => {
  const { currentUser, isLoading, error, updateUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (profileData: any) => {
    await updateUserProfile(profileData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner fullPage />
      </Container>
    );
  }

  if (!currentUser) {
    return (
      <Container>
        <ErrorMessage
          message="No se pudo cargar la información del perfil."
          details={error || undefined}
        />
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6 text-white">Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta de perfil principal */}
        <div className="md:col-span-2">
          <Card>
            <ProfileHeader
              title="Información Personal"
              isEditing={isEditing}
              onEdit={handleStartEdit}
              onCancel={handleCancelEdit}
            />

            {isEditing ? (
              <ProfileForm
                initialData={currentUser}
                onSubmit={handleSubmit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <ProfileInfo user={currentUser} />
            )}
          </Card>
        </div>

        {/* Tarjeta lateral con resumen */}
        <div>
          <ProfileSidebar user={currentUser} />
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
