import React, { memo, useCallback, useState } from 'react';
import { useTheme } from '@/contexts/theme-provider';
import { Handle, Position } from '@xyflow/react';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { NodeProps } from '@xyflow/react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '@/contexts/AuthProvider';

const WebHookTGMNCreateNode: React.FC<NodeProps> = memo(({ data, isConnectable }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const { backendAddress } = useAuth();

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleDelete = useCallback(() => {
    if (data.onDelete && typeof data.onDelete === 'function') {
      data.onDelete();
    }
    setIsConfirmingDelete(false);
    setIsOpen(false);
  }, [data]);

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <>
      <div className="w-20 h-20 z-10 relative flex items-center justify-center px-4 py-2 border-dashed border-2 border-gray-900 dark:border-white rounded-xl cursor-grab bg-neutral-50 dark:bg-gray-900 text-xs" onClick={() => setIsOpen(true)}>
        <a className="text-2xl font-medium">
          {data.icon ? (
            typeof data.icon === "string" ? (
              <img
                src={data.icon}
                alt={`${data.label} icon`}
                width={20}
                height={20}
              />
            ) : (
              React.createElement(data.icon as React.ComponentType<{ size: number }>, { size: 20 })
            )
          ) : (
            <div className="w-5 h-5" />
          )}
        </a>
        <Handle
          type="source"
          position={Position.Right}
          id="a"
          isConnectable={isConnectable}
          style={{
            width: '15px',
            height: '15px',
            backgroundColor: theme === 'dark' ? 'white' : '#111827',
            border: 'none',
          }}
        />
      </div>
      <p className="text-center text-xs mt-2 font-thin max-w-20">
        {data?.name as string}
      </p>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
            <DialogHeader>
              <DialogTitle>{isConfirmingDelete ? 'Confirm Deletion' : 'Node Settings'}</DialogTitle>
              <DialogDescription>
                {isConfirmingDelete
                  ? 'Are you sure you want to delete this node?'
                  : 'Manage your webhook settings here.'}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <div>
                <Label>Webhook URL</Label>
                <Input
                  readOnly
                  value={`${backendAddress}/api/trigger-me-not/on-fetch/${(data.settings as any)?.token}`}
                />
              </div>
            </div>
            <DialogFooter>
              {isConfirmingDelete ? (
                <>
                  <Button onClick={handleCancelDelete} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleDelete} type="button" variant="destructive">
                    Confirm Delete
                  </Button>
                </>
              ) : (
                <Button onClick={handleDeleteClick} type="button" variant="destructive">
                  Delete Node
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  );
});

export default WebHookTGMNCreateNode;
