"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Pause, Trash2 } from "lucide-react";
import { pauseAccount, logout } from "@/lib/services/auth.service";
import { showError } from "@/lib/ui/toast";
import { ROUTES } from "@/lib/routes";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

const DELETE_CONFIRM_TEXT = "DELETE";

interface DangerZoneSectionProps {
  userId: string;
}

function DangerZoneRow({
  title,
  description,
  buttonLabel,
  buttonClassName,
  onClick,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  buttonClassName?:string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        onClick={onClick}
        className={`shrink-0 rounded-lg border border-danger px-4 py-2 text-sm font-bold text-danger transition-colors ${buttonClassName}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

function DangerZoneSection({ userId }: DangerZoneSectionProps) {
  const router = useRouter();

  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePause = async () => {
    setIsPausing(true);
    try {
      const result = await pauseAccount(userId);

      if (!result.success) {
        showError(result.message || "Failed to pause account.");
        setIsPausing(false);
        return;
      }

      // Force sign-out immediately, per the agreed flow.
      await logout();
      router.push(ROUTES.LOGIN);
      router.refresh();
    } catch (err) {
      console.error("Pause account error:", err);
      showError("An unexpected error occurred. Please try again.");
      setIsPausing(false);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmText("");
  };

  const handleDelete = async () => {
    // TODO: not yet implemented — blocked on confirming whether
    // profiles/expenses/budgets have ON DELETE CASCADE set on their
    // user_id foreign keys. If they do, this needs a server route
    // handler (service-role client) that deletes the auth user and lets
    // cascade handle the rest. If not, that route must delete those
    // rows explicitly, in the right order, before deleting the auth
    // user. Either way this can't run from a plain client-side service
    // function the way pauseAccount does — deleting an auth user
    // requires the admin client, which never runs in the browser.
    setIsDeleting(true);
    try {
      showError("Account deletion isn't wired up yet.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-danger/30">
        <div className="mb-1 flex items-center gap-2 p-6 border-b border-b-danger/30 bg-danger/5 ">
          <AlertTriangle className="h-5 w-5 text-danger" />
          <h2 className="text-lg font-semibold text-danger">Danger Zone</h2>
        </div>
 <div className="divide-y divide-danger/10">
          <DangerZoneRow
            title="Pause account"
            description="Disables login and stops your account from being processed — a reversible middle step before deleting. Your data isn't touched; log back in anytime to pick up where you left off."
            buttonLabel="Pause account"
            buttonClassName="hover:bg-danger/10"
            onClick={() => setIsPauseModalOpen(true)}
          />
          <DangerZoneRow
            title="Delete account permanently"
            description="Permanently deletes your account and all expense data. This can't be undone."
            buttonLabel="Delete Account"
            buttonClassName="bg-danger text-white hover:bg-danger/80"
            onClick={() => setIsDeleteModalOpen(true)}
          />
        </div>
       
      </div>

      <ConfirmationModal
        isOpen={isPauseModalOpen}
        onClose={() => setIsPauseModalOpen(false)}
        onConfirm={handlePause}
        icon={Pause}
        variant="warning"
        title="Pause your account?"
        description="You'll be logged out immediately, and login will be disabled until you reactivate. Your expenses, budgets, and settings stay exactly as they are — nothing is deleted or changed. Just log back in with your usual email and password whenever you're ready, and you'll be prompted to reactivate."
        confirmLabel="Pause account"
        loadingLabel="Pausing..."
        isLoading={isPausing}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        icon={Trash2}
        variant="danger"
        title="Delete your account permanently?"
        description={
          <>
            <p>This will immediately and permanently:</p>
            <ul className="ml-5 mt-2 list-disc space-y-1">
              <li>Delete every expense you&apos;ve logged</li>
              <li>Delete your profile, budgets, and settings</li>
              <li>Sign you out of ThinkSpend everywhere</li>
            </ul>
            <p className="mt-3">
              <strong className="text-foreground">
                This cannot be undone.
              </strong>{" "}
              If you just want a break, use Pause instead.
            </p>
          </>
        }
        confirmLabel="Delete permanently"
        loadingLabel="Deleting..."
        isLoading={isDeleting}
        isConfirmDisabled={deleteConfirmText !== DELETE_CONFIRM_TEXT}
      >
        <div className="mt-4">
          <label
            htmlFor="deleteConfirmText"
            className="mb-1.5 block text-sm text-muted-foreground"
          >
            Type <strong className="text-danger">{DELETE_CONFIRM_TEXT}</strong> to
            confirm
          </label>
          <input
            id="deleteConfirmText"
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder={DELETE_CONFIRM_TEXT}
            className="w-full rounded-lg border border-muted-foreground/30 bg-secondary px-3 py-2.5 text-sm outline-none focus:border-danger focus:ring-1 focus:ring-danger"
          />
        </div>
      </ConfirmationModal>
    </>
  );
}

export default DangerZoneSection;