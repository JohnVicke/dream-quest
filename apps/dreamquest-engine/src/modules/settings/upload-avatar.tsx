"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, Plus } from "lucide-react";
import type { FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";

import { Button } from "@dq/ui/button";
import { useToast } from "@dq/ui/use-toast";

import { useUploadThing } from "~/lib/uploadthing/generate-components";

export function UploadAvatar({
  communityId,
  avatarUrl,
}: {
  communityId: string;
  avatarUrl?: string;
}) {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "communityAvatar",
    {
      onUploadError: () => {
        toast({
          title: "Oops, looks like we couldn't upload your avatar.",
          description: "Something went wrong, try again later.",
          variant: "destructive",
        });
      },
      onClientUploadComplete: (res) => {
        toast({
          title: "Your avatar has been uploaded 🎉",
          description: "It may take a few minutes to update.",
        });
      },
    },
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const maxFileSize = permittedFileInfo?.config.image?.maxFileSize;

  return (
    <>
      <div {...getRootProps()} className="w-fit">
        <input {...getInputProps()} />
        <div className="relative cursor-pointer">
          {avatarUrl || files.length > 0 ? (
            <Image
              src={avatarUrl ?? URL.createObjectURL(files[0])}
              alt="Avatar"
              className="h-20 w-20 rounded-full"
              width={80}
              height={80}
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}
          <Plus className="absolute bottom-1 right-2 h-4 w-4 rounded-full bg-muted-foreground text-muted" />
        </div>
        <dt>Max filesize</dt>
        <dd>{maxFileSize}</dd>
        <div></div>
      </div>
      {files.length > 0 && (
        <Button
          disabled={isUploading}
          onClick={() => startUpload(files, { communityId })}
        >
          Upload
        </Button>
      )}
    </>
  );
}
