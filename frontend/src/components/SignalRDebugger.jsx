import React, { useState, useEffect } from 'react';
import signalRService from '../services/signalRService';

const SignalRDebugger = () => {
  const [connectionState, setConnectionState] = useState('Disconnected');
  const [logs, setLogs] = useState([]);
  const [testMessage, setTestMessage] = useState('Test notification message');

  useEffect(() => {
    const updateConnectionState = () => {
      const state = signalRService.getConnectionState();
      setConnectionState(state);
      addLog(`Connection state: ${state}`);
    };

    // Update connection state every 2 seconds
    const interval = setInterval(updateConnectionState, 2000);
    
    // Initial state check
    updateConnectionState();

    return () => clearInterval(interval);
  }, []);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleConnect = async () => {
    addLog('Attempting to connect...');
    try {
      await signalRService.initializeConnection();
      addLog('Connection attempt completed');
    } catch (error) {
      addLog(`Connection error: ${error.message}`);
    }
  };

  const handleDisconnect = async () => {
    addLog('Disconnecting...');
    try {
      await signalRService.stopConnection();
      addLog('Disconnected successfully');
    } catch (error) {
      addLog(`Disconnect error: ${error.message}`);
    }
  };

  const handleSendTestNotification = async () => {
    addLog('Sending test notification...');
    try {
      await signalRService.sendNotification('SendMessageToAll', {
        user: 'TestUser',
        message: testMessage
      });
      addLog('Test notification sent');
    } catch (error) {
      addLog(`Send error: ${error.message}`);
    }
  };

  const handleSimulateRegistration = async () => {
    addLog('Simulating new registration notification...');
    try {
      const testData = {
        StudentId: 'STU12345',
        ClassName: 'Mathematics 101',
        SubjectNames: ['Algebra', 'Calculus'],
        IndexNumber: 'IDX001'
      };
      
      await signalRService.sendNotification('NotifyNewRegistrationAsync', testData);
      addLog('Registration simulation sent');
    } catch (error) {
      addLog(`Registration simulation error: ${error.message}`);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace', 
      backgroundColor: '#f5f5f5',
      margin: '20px',
      borderRadius: '8px'
    }}>
      <h2>SignalR Debug Panel</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Connection State: </strong>
        <span style={{ 
          color: connectionState === 'Connected' ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {connectionState}
        </span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleConnect} style={{ marginRight: '10px', padding: '8px 16px' }}>
          Connect
        </button>
        <button onClick={handleDisconnect} style={{ marginRight: '10px', padding: '8px 16px' }}>
          Disconnect
        </button>
        <button onClick={handleSendTestNotification} style={{ marginRight: '10px', padding: '8px 16px' }}>
          Send Test Message
        </button>
        <button onClick={handleSimulateRegistration} style={{ marginRight: '10px', padding: '8px 16px' }}>
          Simulate Registration
        </button>
        <button onClick={clearLogs} style={{ padding: '8px 16px', backgroundColor: '#ff6b6b', color: 'white', border: 'none' }}>
          Clear Logs
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          placeholder="Enter test message"
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
      </div>

      <div style={{ 
        backgroundColor: 'black', 
        color: 'green', 
        padding: '10px', 
        height: '300px', 
        overflowY: 'auto',
        fontSize: '12px'
      }}>
        <div><strong>Debug Logs:</strong></div>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
        {logs.length === 0 && <div style={{ color: '#666' }}>No logs yet...</div>}
      </div>
    </div>
  );
};

export default SignalRDebugger;
